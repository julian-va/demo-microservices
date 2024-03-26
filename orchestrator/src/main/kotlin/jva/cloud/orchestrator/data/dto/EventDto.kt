package jva.cloud.orchestrator.data.dto

import jakarta.annotation.Nonnull
import jakarta.validation.constraints.NotBlank
import java.util.*

data class EventDto<T>(
    val eventId: String = UUID.randomUUID().toString(),
    @Nonnull
    @NotBlank
    val topicName: String,
    val date: Date = Date(),
    @Nonnull
    @NotBlank
    val type: EventType,
    val messages: T,
)
