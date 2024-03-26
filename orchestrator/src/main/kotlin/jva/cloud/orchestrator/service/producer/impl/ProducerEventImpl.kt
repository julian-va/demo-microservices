package jva.cloud.orchestrator.service.producer.impl

import jva.cloud.orchestrator.data.dto.EventDto
import jva.cloud.orchestrator.service.producer.ProducerEvent
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.stereotype.Service

@Service
class ProducerEventImpl(
    private val kafkaTemplate: KafkaTemplate<String, EventDto<*>>
) :
    ProducerEvent {
    override fun accept(event: EventDto<*>) {
        kafkaTemplate.send(event.topicName, event.eventId, event)
    }
}