package jva.cloud.orchestrator.service.event.impl

import jva.cloud.orchestrator.config.ServiceExecuteConfig.Companion.EXECUTOR_SPRING
import jva.cloud.orchestrator.data.dto.EventDto
import jva.cloud.orchestrator.data.entity.Event
import jva.cloud.orchestrator.data.repository.EventRepository
import jva.cloud.orchestrator.service.event.EventService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class EventServiceImpl(private val eventRepository: EventRepository) :
    EventService {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(EventServiceImpl::class.java)
    }

    @Async(EXECUTOR_SPRING)
    @Transactional()
    override fun accept(event: EventDto<LinkedHashMap<String, Any>>) {
        val entity = eventRepository.save(mapperDtoToEntity(event = event))
    }

    private fun mapperDtoToEntity(event: EventDto<LinkedHashMap<String, Any>>): Event {
        return Event(
            id = null,
            eventId = event.eventId,
            topicName = event.topicName,
            date = event.date,
            type = event.type,
            messages = event.messages,
            forwardedMessage = false,
            dateCreate = null,
            lastUpdate = null
        )
    }
}