interface rotationMatrix {
  [key: string]: {
    angle: number,
    offsetX: undefined | any
  }
}

interface cameraKeys {
  [key: number]: string
}

const meshRotationMatrix: rotationMatrix = {
  left: {
    offsetX: 0,
    angle: -Math.PI / 2,
  },
  right: {
    offsetX: 0,
    angle: Math.PI / 2,
  },
  front: {
    offsetX: 0,
    angle: 0,
  },
  back: {
    offsetX: 0,
    angle: Math.PI,
  },
  top: {
    offsetX: 0,
    angle: 0,
  },
  bottom: {
    offsetX: 0,
    angle: -Math.PI,
  }
}

const changeCameraKeys: cameraKeys = {
  49: 'left',
  50: 'right',
  51: 'front',
  52: 'back',
};

const changeCameraTopBottomKeys: cameraKeys = {
  53: 'top',
  54: 'bottom',
};

const ROTATE_KEY_CODE = 79;
const CAM_DISTANCE = 300;

export {
  meshRotationMatrix,
  changeCameraKeys,
  ROTATE_KEY_CODE,
  CAM_DISTANCE,
  changeCameraTopBottomKeys,
}