# frock-middleware-delay

A frock middleware for introducing latency into a request.

## `frockfile` Example

In your working directory, create a `frockfile.js`:

```json
{
  "servers": [
    {
      "port": 8080,
      "routes": [
        {
          "path": "/api/people",
          "methods": ["GET"],
          "handler": "frock-static",
          "middleware": [
            {
              "handler": "frock-middleware-delay",
              "options": {
                "min": 300,
                "max" 1500
              }
            }
          ]
          "options": {
            "file": "fixtures/static/people.json",
            "contentType": "application/json"
          }
        }
      ]
    }
  ]
}
```

## License

Apache 2.0, see [LICENSE](./LICENSE) for details.
