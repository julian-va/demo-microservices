package jva.cloud.orchestrator.config


import jva.cloud.orchestrator.data.dto.EventDto
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.common.serialization.StringDeserializer
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.annotation.EnableKafka
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory
import org.springframework.kafka.core.ConsumerFactory
import org.springframework.kafka.core.DefaultKafkaConsumerFactory
import org.springframework.kafka.support.serializer.JsonDeserializer
import org.springframework.kafka.support.serializer.JsonSerializer


@Configuration
@EnableKafka
class KafkaConsumerConfig(
    @Value("\${kafka.bootstrap_server_config}") private val bootstrapServer: String,
    @Value("\${kafka.topic_grouped_id}") private val groupedId: String
) {
    companion object {
        const val TYPE_MAPPINGS: String = ":jva.cloud.orchestrator.data.dto.EventDto"
    }

    fun consumerProps(): Map<String, Any> {
        val props: MutableMap<String, Any> = mutableMapOf()
        props[ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG] = bootstrapServer
        props[ConsumerConfig.GROUP_ID_CONFIG] = groupedId
        props[JsonSerializer.TYPE_MAPPINGS] = TYPE_MAPPINGS
        props[ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG] = StringDeserializer::class.java
        props[ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG] = JsonDeserializer::class.java
        return props
    }

    @Bean
    fun consumerFactory(): ConsumerFactory<String, EventDto<*>> {
        return DefaultKafkaConsumerFactory(consumerProps())
    }

    @Bean
    fun containerFactory(): ConcurrentKafkaListenerContainerFactory<String, EventDto<*>> {
        val listenerContainerFactory: ConcurrentKafkaListenerContainerFactory<String, EventDto<*>> =
            ConcurrentKafkaListenerContainerFactory()
        listenerContainerFactory.consumerFactory = consumerFactory()
        return listenerContainerFactory
    }
}