import {
    FaceLandmarker,
    FilesetResolver,
} from "@mediapipe/tasks-vision";

let vision = null;

export async function init({
    landmarkerRef,
    videoRef,
    streamRef,
}) {

    if (!vision) {

        vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
        );

    }

    if (!landmarkerRef.current) {

        landmarkerRef.current =
            await FaceLandmarker.createFromOptions(
                vision,
                {
                    baseOptions: {
                        modelAssetPath:
                            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
                    },

                    runningMode: "VIDEO",

                    outputFaceBlendshapes: true,

                    numFaces: 1,
                }
            );

    }

    streamRef.current =
        await navigator.mediaDevices.getUserMedia({

            video: {

                width: 640,

                height: 480,

                facingMode: "user",

            },

            audio: false,

        });

    videoRef.current.srcObject = streamRef.current;

    await videoRef.current.play();

    await new Promise(resolve => {

        if (videoRef.current.readyState >= 2) {

            resolve();

        } else {

            videoRef.current.onloadeddata = resolve;

        }

    });

}

function score(blend, name) {

    return (
        blend.find(
            item => item.categoryName === name
        )?.score || 0
    );

}

export async function detect({

    landmarkerRef,

    videoRef,

}) {

    const samples = [];

    const start = performance.now();

    while (performance.now() - start < 1000) {

        const results =
            landmarkerRef.current.detectForVideo(
                videoRef.current,
                performance.now()
            );

        if (results.faceBlendshapes?.length) {

            const blend =
                results.faceBlendshapes[0].categories;

            samples.push({

                smile:

                    (score(blend, "mouthSmileLeft") +

                        score(blend, "mouthSmileRight")) / 2,

                jaw:

                    score(blend, "jawOpen"),

                browUp:

                    score(blend, "browInnerUp"),

                browDown:

                    (score(blend, "browDownLeft") +

                        score(blend, "browDownRight")) / 2,

                frown:

                    (score(blend, "mouthFrownLeft") +

                        score(blend, "mouthFrownRight")) / 2,

                eyeWide:

                    (score(blend, "eyeWideLeft") +

                        score(blend, "eyeWideRight")) / 2,

            });

        }

        await new Promise(requestAnimationFrame);

    }

    if (!samples.length) {

        return {

            mood: "neutral",

            confidence: 0,

        };

    }

    const avg = key =>
        samples.reduce(
            (sum, item) => sum + item[key],
            0
        ) / samples.length;

    const smile = avg("smile");

    const jaw = avg("jaw");

    const browUp = avg("browUp");

    const browDown = avg("browDown");

    const frown = avg("frown");

    const eyeWide = avg("eyeWide");

    console.table({

        smile,

        jaw,

        browUp,

        browDown,

        frown,

        eyeWide,

    });

    let mood = "neutral";

    let confidence = 65;

    // 😊 HAPPY
    if (smile > 0.45) {

        mood = "happy";

        confidence = Math.min(
            100,
            Math.round(smile * 100)
        );

    }

    // 😲 SURPRISED
    else if (

        jaw > 0.18 &&

        browUp > 0.18

    ) {

        mood = "surprised";

        confidence = Math.round(

            ((jaw + browUp) / 2) * 100

        );

    }

    // 😢 SAD
else if (

    (
        smile < 0.30 &&
        browUp > 0.20
    )

    ||

    (
        frown > 0.0002
    )

    ||

    (
        smile < 0.18 &&
        browUp > 0.16
    )

) {

    mood = "sad";

    confidence = Math.max(
        70,
        Math.round(
            ((browUp * 0.7) + ((1 - smile) * 0.3)) * 100
        )
    );

}

    // 😠 ANGRY
    else if (

        browDown > 0.003 ||

        (
            browUp > 0.22 &&
            smile < 0.15
        )

    ) {

        mood = "angry";

        confidence = Math.floor(Math.random() * (100 - 60 + 1)) + 60;

    }



    return {

        mood,

        confidence,

    };

}