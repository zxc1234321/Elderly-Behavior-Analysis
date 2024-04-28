from ultralytics import YOLO
from ultralytics.utils.plotting import Annotator
import cv2
import torch


class CameraStreaming():

    def __init__(self,model):
        self.model = model

    def draw_boxes(self,result, frame):
        for boxes in result.boxes:
            x1, y1, x2, y2, score, classes = boxes.data.squeeze().cpu().numpy()
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 0, 255), 1)
        return frame

    # 모델 추론 및 시각화 적용
    def predict(self, frame, iou=0.7, conf=0.25):
        results = self.model(
            source=frame,
            device="0" if torch.cuda.is_available() else "cpu",
            iou=0.7,
            conf=0.25,
            verbose=False,
        )
        result = results[0]
        return result

    # 키 포인트 시각화
    def draw_keypoints(self,result, frame):
        annotator = Annotator(frame, line_width=1)
        for kps in result.keypoints:
            kps = kps.data.squeeze()
            annotator.kpts(kps)
            nkps = kps.cpu().numpy()
            # nkps[:,2] = 1
            # annotator.kpts(nkps)
            for idx, (x, y, score) in enumerate(nkps):
                if score > 0.5:
                    cv2.circle(frame, (int(x), int(y)), 3, (0, 0, 255), cv2.FILLED)
                    cv2.putText(
                        frame, str(idx), (int(x), int(y)), cv2.FONT_HERSHEY_COMPLEX,
                        1, (0, 0, 255), 1
                    )
        return frame

#
# if __name__ == "__main__":
#     CameraStreaming()
