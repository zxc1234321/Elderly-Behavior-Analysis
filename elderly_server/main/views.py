from django.http import HttpResponse, StreamingHttpResponse
from django.shortcuts import render
from ultralytics.models.yolo.model import YOLO
import cv2

from .services.camera_service import CameraStreaming


def frame_generator(camera_service: CameraStreaming):

    capture = cv2.VideoCapture(0)
    camera_service = camera_service


    while True:
        ret, frame = capture.read()
        result = camera_service.predict(frame)
        frame = camera_service.draw_boxes(result, frame)
        frame = camera_service.draw_keypoints(result, frame)
        res, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')


# Create your views here.

def index(request):
    return render(request, 'main/index.html')

def video(request):
    model = YOLO("../model/yolov8m-pose.pt")

    camera_service = CameraStreaming(model)
    return StreamingHttpResponse(frame_generator(camera_service),content_type='multipart/x-mixed-replace; boundary=frame')