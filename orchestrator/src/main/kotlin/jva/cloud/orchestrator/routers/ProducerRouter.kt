package jva.cloud.orchestrator.routers

import jakarta.validation.Valid
import jva.cloud.orchestrator.data.dto.EventDto
import jva.cloud.orchestrator.service.producer.ProducerEvent
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/producer"])
class ProducerRouter(private val producerEvent: ProducerEvent) {
    @PostMapping
    fun sendProducer(@Valid @RequestBody event: EventDto<*>): ResponseEntity<Unit> {
        producerEvent.accept(event)
        return ResponseEntity.ok().build()
    }
}