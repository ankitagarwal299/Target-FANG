# API Specifications

## Base URL
```
Production: https://api.notifications.example.com/v1
Staging: https://api-staging.notifications.example.com/v1
```

## Authentication

All API requests require authentication using one of the following methods:

### API Key (Service-to-Service)
```http
Authorization: Bearer YOUR_API_KEY
```

### OAuth 2.0 (User-facing)
```http
Authorization: Bearer YOUR_OAUTH_TOKEN
```

---

## Endpoints

### 1. Send Notification

**Endpoint**: `POST /v1/notifications`

**Description**: Send a notification to one or more users

**Headers**:
```http
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
Idempotency-Key: unique_request_id (optional)
```

**Request Body**:
```json
{
  "user_ids": ["user_123", "user_456"],
  "template_id": "welcome_email_v2",
  "channel": "email",
  "priority": "high",
  "variables": {
    "first_name": "John",
    "verification_code": "AB12CD"
  },
  "metadata": {
    "campaign_id": "summer_2024",
    "source": "signup_flow"
  },
  "scheduled_at": "2024-12-04T10:00:00Z",
  "callback_url": "https://yourapp.com/webhooks/notifications"
}
```

**Request Parameters**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user_ids` | array | Yes | List of user IDs to send notification to |
| `template_id` | string | Yes | Template identifier |
| `channel` | string | Yes | `email`, `sms`, `push`, `in_app` |
| `priority` | string | No | `high`, `medium`, `low` (default: `medium`) |
| `variables` | object | No | Template variable substitutions |
| `metadata` | object | No | Custom metadata for tracking |
| `scheduled_at` | string | No | ISO 8601 timestamp for scheduled delivery |
| `callback_url` | string | No | Webhook URL for status updates |

**Response** (202 Accepted):
```json
{
  "notification_ids": [
    "notif_abc123def456",
    "notif_xyz789ghi012"
  ],
  "status": "accepted",
  "message": "Notifications queued for processing"
}
```

**Error Response** (400 Bad Request):
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid channel specified",
    "details": {
      "field": "channel",
      "allowed_values": ["email", "sms", "push", "in_app"]
    }
  }
}
```

**Error Response** (429 Too Many Requests):
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 3600 seconds",
    "retry_after": 3600
  }
}
```

---

### 2. Get Notification Status

**Endpoint**: `GET /v1/notifications/{notification_id}`

**Description**: Retrieve the status of a notification

**Response** (200 OK):
```json
{
  "notification_id": "notif_abc123def456",
  "user_id": "user_123",
  "channel": "email",
  "template_id": "welcome_email_v2",
  "status": "delivered",
  "created_at": "2024-12-03T12:00:00Z",
  "sent_at": "2024-12-03T12:00:01Z",
  "delivered_at": "2024-12-03T12:00:05Z",
  "opened_at": "2024-12-03T12:15:00Z",
  "clicked_at": null,
  "provider": "sendgrid",
  "metadata": {
    "campaign_id": "summer_2024"
  },
  "events": [
    {
      "event": "created",
      "timestamp": "2024-12-03T12:00:00Z"
    },
    {
      "event": "sent",
      "timestamp": "2024-12-03T12:00:01Z"
    },
    {
      "event": "delivered",
      "timestamp": "2024-12-03T12:00:05Z",
      "provider_response": {
        "message_id": "sg_msg_123"
      }
    },
    {
      "event": "opened",
      "timestamp": "2024-12-03T12:15:00Z"
    }
  ]
}
```

**Status Values**:
- `pending` - Queued for processing
- `sent` - Sent to provider
- `delivered` - Confirmed delivery by provider
- `failed` - Delivery failed
- `opened` - User opened notification (email/push)
- `clicked` - User clicked link in notification

---

### 3. Get User Preferences

**Endpoint**: `GET /v1/users/{user_id}/preferences`

**Description**: Retrieve notification preferences for a user

**Response** (200 OK):
```json
{
  "user_id": "user_123",
  "channels": {
    "email": {
      "enabled": true,
      "address": "user@example.com"
    },
    "sms": {
      "enabled": false,
      "phone": "+1234567890"
    },
    "push": {
      "enabled": true,
      "devices": [
        {
          "device_id": "device_abc",
          "platform": "ios",
          "token": "apns_token_xyz"
        }
      ]
    },
    "in_app": {
      "enabled": true
    }
  },
  "quiet_hours": {
    "enabled": true,
    "start": "22:00",
    "end": "08:00",
    "timezone": "America/Los_Angeles"
  },
  "frequency_caps": {
    "marketing": {
      "max_per_day": 2,
      "max_per_week": 10
    },
    "transactional": {
      "max_per_day": -1
    }
  },
  "categories": {
    "promotional": false,
    "transactional": true,
    "social": true,
    "system": true
  }
}
```

---

### 4. Update User Preferences

**Endpoint**: `PUT /v1/users/{user_id}/preferences`

**Description**: Update notification preferences for a user

**Request Body**:
```json
{
  "channels": {
    "email": {
      "enabled": true
    },
    "sms": {
      "enabled": false
    }
  },
  "categories": {
    "promotional": false
  }
}
```

**Response** (200 OK):
```json
{
  "user_id": "user_123",
  "updated_at": "2024-12-03T12:30:00Z",
  "preferences": { ... }
}
```

---

### 5. Create Template

**Endpoint**: `POST /v1/templates`

**Description**: Create a new notification template

**Request Body**:
```json
{
  "template_id": "password_reset_v1",
  "name": "Password Reset Email",
  "channel": "email",
  "language": "en",
  "subject": "Reset your password for {{app_name}}",
  "body": "Hi {{user.first_name}},\n\nClick here to reset your password: {{reset_link}}\n\nThis link expires in 1 hour.",
  "variables": [
    "app_name",
    "user.first_name",
    "reset_link"
  ],
  "metadata": {
    "category": "transactional",
    "owner": "security_team"
  }
}
```

**Response** (201 Created):
```json
{
  "template_id": "password_reset_v1",
  "version": 1,
  "created_at": "2024-12-03T12:00:00Z",
  "status": "active"
}
```

---

### 6. Get Template

**Endpoint**: `GET /v1/templates/{template_id}`

**Description**: Retrieve a template by ID

**Response** (200 OK):
```json
{
  "template_id": "password_reset_v1",
  "name": "Password Reset Email",
  "channel": "email",
  "language": "en",
  "subject": "Reset your password for {{app_name}}",
  "body": "Hi {{user.first_name}}...",
  "variables": ["app_name", "user.first_name", "reset_link"],
  "version": 1,
  "created_at": "2024-12-03T12:00:00Z",
  "updated_at": "2024-12-03T12:00:00Z",
  "status": "active"
}
```

---

### 7. List Notifications

**Endpoint**: `GET /v1/notifications`

**Description**: List notifications with filtering

**Query Parameters**:
- `user_id` - Filter by user ID
- `channel` - Filter by channel (email, sms, push, in_app)
- `status` - Filter by status
- `from` - Start date (ISO 8601)
- `to` - End date (ISO 8601)
- `limit` - Number of results (default: 50, max: 100)
- `offset` - Pagination offset

**Example Request**:
```
GET /v1/notifications?user_id=user_123&channel=email&status=delivered&limit=10
```

**Response** (200 OK):
```json
{
  "notifications": [
    {
      "notification_id": "notif_abc123",
      "user_id": "user_123",
      "channel": "email",
      "status": "delivered",
      "created_at": "2024-12-03T12:00:00Z"
    }
  ],
  "pagination": {
    "total": 245,
    "limit": 10,
    "offset": 0,
    "has_more": true
  }
}
```

---

### 8. Get Analytics

**Endpoint**: `GET /v1/analytics`

**Description**: Retrieve notification analytics

**Query Parameters**:
- `from` - Start date (ISO 8601)
- `to` - End date (ISO 8601)
- `channel` - Filter by channel
- `template_id` - Filter by template
- `group_by` - Group results (day, week, month, channel, template)

**Response** (200 OK):
```json
{
  "period": {
    "from": "2024-12-01T00:00:00Z",
    "to": "2024-12-03T23:59:59Z"
  },
  "summary": {
    "total_sent": 1250000,
    "total_delivered": 1225000,
    "total_failed": 25000,
    "total_opened": 612500,
    "total_clicked": 125000,
    "delivery_rate": 98.0,
    "open_rate": 50.0,
    "click_rate": 10.2
  },
  "by_channel": {
    "email": {
      "sent": 750000,
      "delivered": 735000,
      "delivery_rate": 98.0,
      "open_rate": 55.0
    },
    "sms": {
      "sent": 250000,
      "delivered": 245000,
      "delivery_rate": 98.0
    },
    "push": {
      "sent": 200000,
      "delivered": 195000,
      "delivery_rate": 97.5,
      "open_rate": 35.0
    },
    "in_app": {
      "sent": 50000,
      "delivered": 50000,
      "delivery_rate": 100.0
    }
  },
  "timeline": [
    {
      "date": "2024-12-01",
      "sent": 400000,
      "delivered": 392000
    },
    {
      "date": "2024-12-02",
      "sent": 425000,
      "delivered": 416500
    },
    {
      "date": "2024-12-03",
      "sent": 425000,
      "delivered": 416500
    }
  ]
}
```

---

### 9. Register Device (Push Notifications)

**Endpoint**: `POST /v1/devices`

**Description**: Register a device for push notifications

**Request Body**:
```json
{
  "user_id": "user_123",
  "platform": "ios",
  "device_token": "apns_token_abc123def456",
  "device_id": "device_uuid_123",
  "app_version": "2.5.0",
  "os_version": "17.2"
}
```

**Response** (201 Created):
```json
{
  "device_id": "device_uuid_123",
  "registered_at": "2024-12-03T12:00:00Z",
  "status": "active"
}
```

---

### 10. Unregister Device

**Endpoint**: `DELETE /v1/devices/{device_id}`

**Description**: Unregister a device from push notifications

**Response** (204 No Content)

---

## Webhooks

### Delivery Status Webhook

When you provide a `callback_url` when sending a notification, we'll POST status updates to that URL.

**Webhook Payload**:
```json
{
  "event": "notification.delivered",
  "notification_id": "notif_abc123def456",
  "user_id": "user_123",
  "channel": "email",
  "status": "delivered",
  "timestamp": "2024-12-03T12:00:05Z",
  "provider": "sendgrid",
  "provider_response": {
    "message_id": "sg_msg_123"
  },
  "metadata": {
    "campaign_id": "summer_2024"
  }
}
```

**Webhook Events**:
- `notification.sent` - Sent to provider
- `notification.delivered` - Confirmed delivery
- `notification.failed` - Delivery failed
- `notification.opened` - User opened
- `notification.clicked` - User clicked link
- `notification.bounced` - Email bounced
- `notification.complained` - Spam complaint

**Webhook Security**:

We sign all webhooks with HMAC-SHA256. Verify the signature:

```python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected)
```

**Headers**:
```http
X-Notification-Signature: sha256=abc123def456...
X-Notification-Event: notification.delivered
X-Notification-Timestamp: 2024-12-03T12:00:05Z
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Malformed request body or parameters |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Temporary outage |

---

## Rate Limits

| Tier | Requests/Hour | Requests/Day |
|------|---------------|--------------|
| Free | 1,000 | 10,000 |
| Basic | 10,000 | 100,000 |
| Pro | 100,000 | 1,000,000 |
| Enterprise | Custom | Custom |

**Rate Limit Headers**:
```http
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 9950
X-RateLimit-Reset: 1701619200
```

---

## Idempotency

Use the `Idempotency-Key` header to safely retry requests without duplicates:

```http
POST /v1/notifications
Idempotency-Key: req_abc123def456
```

- Same key within 24 hours returns cached response
- Prevents duplicate notifications
- Recommended for all POST/PUT requests

---

## SDK Examples

### cURL
```bash
curl -X POST https://api.notifications.example.com/v1/notifications \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $(uuidgen)" \
  -d '{
    "user_ids": ["user_123"],
    "template_id": "welcome_email_v2",
    "channel": "email",
    "variables": {
      "first_name": "John"
    }
  }'
```

### Python
```python
import requests

response = requests.post(
    "https://api.notifications.example.com/v1/notifications",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    json={
        "user_ids": ["user_123"],
        "template_id": "welcome_email_v2",
        "channel": "email",
        "variables": {"first_name": "John"}
    }
)

print(response.json())
```

### Node.js
```javascript
const axios = require('axios');

const response = await axios.post(
  'https://api.notifications.example.com/v1/notifications',
  {
    user_ids: ['user_123'],
    template_id: 'welcome_email_v2',
    channel: 'email',
    variables: { first_name: 'John' }
  },
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

console.log(response.data);
```
