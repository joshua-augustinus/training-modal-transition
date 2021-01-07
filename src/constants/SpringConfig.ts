const FRICTION = 5;//overshoot; higher overshoots less
const SPEED = 5//tension

export const getSpringConfig = (toValue: number) => {
    return {
        toValue: toValue,
        useNativeDriver: true,
        friction: FRICTION,
        tension: SPEED,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01
    }

}