package jva.cloud.orchestrator.data.repository

import jva.cloud.orchestrator.data.entity.Event
import org.springframework.data.jpa.repository.JpaRepository

interface EventRepository : JpaRepository<Event, Long> {
    fun findByForwardedMessage(forwardedMessage: Boolean): List<Event>
}