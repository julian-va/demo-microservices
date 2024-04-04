package jva.cloud.orchestrator.service.event

import jva.cloud.orchestrator.data.dto.EventDto
import java.util.function.Consumer

@FunctionalInterface
interface EventService : Consumer<EventDto<LinkedHashMap<String, Any>>> {

}