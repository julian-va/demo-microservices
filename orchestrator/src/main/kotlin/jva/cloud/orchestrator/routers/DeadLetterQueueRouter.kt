package jva.cloud.orchestrator.routers

import jakarta.validation.Valid
import jva.cloud.orchestrator.data.dto.EventDto
import jva.cloud.orchestrator.service.event.EventService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/dead-letter-queue"])
class DeadLetterQueueRouter(private val eventService: EventService) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(DeadLetterQueueRouter::class.java)
    }

    @PostMapping
    fun saveDeadLetterQueue(@Valid @RequestBody event: EventDto<LinkedHashMap<String, Any>>): ResponseEntity<Unit> {
        logger.info("Body Request : $event")
        logger.info(Thread.currentThread().name)
        eventService.accept(event)
        return ResponseEntity.ok().build()
    }
}