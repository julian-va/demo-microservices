package jva.cloud.orchestrator.service.event.impl

import jva.cloud.orchestrator.config.ServiceExecuteConfig
import jva.cloud.orchestrator.data.dto.EventDto
import jva.cloud.orchestrator.data.entity.Event
import jva.cloud.orchestrator.data.repository.EventRepository
import jva.cloud.orchestrator.service.event.DeadLetterQueueSendMessageService
import jva.cloud.orchestrator.service.producer.ProducerEvent
import org.springframework.scheduling.annotation.Async
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import java.util.concurrent.CompletableFuture

@Component
class DeadLetterQueueSendMessageServiceImpl(
    private val eventRepository: EventRepository,
    private val producerEvent: ProducerEvent
) : DeadLetterQueueSendMessageService {
    companion object {
        private const val DELAY_TIME: Long = 300000
    }

    @Async(ServiceExecuteConfig.EXECUTOR_SPRING)
    @Transactional()
    @Scheduled(fixedDelay = DELAY_TIME)
    override fun get(): CompletableFuture<Boolean> {

        val eventToSend = eventRepository.findByForwardedMessage(forwardedMessage = false)

        eventToSend.forEach { event ->
            producerEvent.accept(mapperEntityToDto(event))
            event.forwardedMessage = true
        }

        eventRepository.saveAll(eventToSend)
        return CompletableFuture<Boolean>()
    }

    private fun mapperEntityToDto(event: Event): EventDto<*> {
        return EventDto(
            eventId = event.eventId,
            date = event.date,
            topicName = event.topicName,
            type = event.type,
            messages = event.messages
        )
    }
}