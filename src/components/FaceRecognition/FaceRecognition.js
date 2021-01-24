import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img
                    id="inputimage"
                    alt=""
                    src={imageUrl}
                    width="500px"
                    heigh="auto"
                />
                {boxes.map((element) => {
                    return (
                        <div
                            key={element.topRow + element.leftCol}
                            className="bounding-box"
                            style={{
                                top: element.topRow,
                                right: element.rightCol,
                                bottom: element.bottomRow,
                                left: element.leftCol,
                            }}
                        ></div>
                    );
                })}
                {/* <div
                    className="bounding-box"
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol,
                    }}
                ></div> */}
            </div>
        </div>
    );
};

export default FaceRecognition;
