package jva.cloud.orchestrator.service.consumer.impl

import jva.cloud.orchestrator.data.dto.EventDto
import jva.cloud.orchestrator.service.consumer.ConsumerEvent
import jva.cloud.orchestrator.service.producer.ProducerEvent
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service

@Service
class ConsumerEventImpl(private val producerEvent: ProducerEvent) : ConsumerEvent {
    companion object {
        private const val TOPIC: String = "order-topic"
        private const val GROUPED_ID: String = "order-group"
        private val logger: Logger = LoggerFactory.getLogger(ConsumerEventImpl::class.java)
    }


    @KafkaListener(topics = [TOPIC], groupId = GROUPED_ID, containerFactory = "containerFactory")
    override fun accept(event: EventDto<*>) {
        try {
            logger.info("Message received $event")
        } catch (ex: Exception) {
            logger.error(ex.message, ex.cause)
            producerEvent.accept(event)
        }
    }
}