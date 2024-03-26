package jva.cloud.orchestrator.service.consumer

import jva.cloud.orchestrator.data.dto.EventDto
import java.util.function.Consumer

@FunctionalInterface
interface ConsumerEvent : Consumer<EventDto<*>> {
}