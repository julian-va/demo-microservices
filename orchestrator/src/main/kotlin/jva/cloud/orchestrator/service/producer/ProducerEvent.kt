package jva.cloud.orchestrator.service.producer

import jva.cloud.orchestrator.data.dto.EventDto
import java.util.function.Consumer

@FunctionalInterface
interface ProducerEvent : Consumer<EventDto<*>> {
}