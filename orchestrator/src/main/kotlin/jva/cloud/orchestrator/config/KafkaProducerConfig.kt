package jva.cloud.orchestrator.config

import jva.cloud.orchestrator.data.dto.EventDto
import org.apache.kafka.clients.producer.ProducerConfig
import org.apache.kafka.common.serialization.StringSerializer
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.core.DefaultKafkaProducerFactory
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.kafka.support.serializer.JsonSerializer


@Configuration
class KafkaProducerConfig(
    @Value("\${kafka.bootstrap_server_config}") private val bootstrapServer: String,
    @Value("\${kafka.retries_config}") private val retries: Int
) {

    fun producerProps(): Map<String, Any> {
        val props: MutableMap<String, Any> = mutableMapOf()
        props[ProducerConfig.BOOTSTRAP_SERVERS_CONFIG] = bootstrapServer
        props[ProducerConfig.RETRIES_CONFIG] = retries
        props[ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG] = StringSerializer::class.java
        props[ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG] = JsonSerializer::class.java
        return props
    }

    @Bean
    fun kafkaTemplate(): KafkaTemplate<String, EventDto<*>> {
        val defaultKafkaProducerFactory: DefaultKafkaProducerFactory<String, EventDto<*>> =
            DefaultKafkaProducerFactory<String, EventDto<*>>(producerProps())
        return KafkaTemplate(defaultKafkaProducerFactory)
    }
}