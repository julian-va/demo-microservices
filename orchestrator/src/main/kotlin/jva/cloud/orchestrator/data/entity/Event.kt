package jva.cloud.orchestrator.data.entity

import jakarta.persistence.*
import jva.cloud.orchestrator.data.dto.EventType
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.annotations.UpdateTimestamp
import org.hibernate.type.SqlTypes
import java.sql.Timestamp
import java.util.*

@Entity()
@Table(name = "event")
data class Event(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long?,

    @Column(name = "event_id", nullable = false)
    val eventId: String,

    @Column(name = "topic_name", nullable = false)
    val topicName: String,

    @Column(name = "date", nullable = false, columnDefinition = "DATE")
    val date: Date,

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    val type: EventType,

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false)
    val messages: LinkedHashMap<String, Any>,

    @Column(name = "forwarded_message", nullable = false, columnDefinition = "boolean default false")
    var forwardedMessage: Boolean,

    @CreationTimestamp
    @Column(name = "date_create", nullable = false, updatable = false)
    val dateCreate: Timestamp?,

    @UpdateTimestamp
    @Column(name = "last_update", nullable = false, updatable = true)
    val lastUpdate: Timestamp?,
)
