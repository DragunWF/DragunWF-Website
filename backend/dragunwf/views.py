"""
Simple status views for health checks and monitoring
"""
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import time


@csrf_exempt
@require_http_methods(["GET", "HEAD"])
def status_check(request):
    """
    Lightweight status endpoint for health checks and monitoring.

    This endpoint is designed to be pinged by monitoring services like UpTime Robot
    to keep the server alive and check if the application is responding.

    Returns:
        JsonResponse: Simple JSON response indicating server status
    """
    return JsonResponse({
        "status": "OK",
        "timestamp": int(time.time()),
        "message": "Server is running"
    })
