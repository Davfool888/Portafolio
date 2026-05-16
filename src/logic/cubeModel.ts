import { Matrix4, Vector3, Quaternion } from "three"

export type Cubie = {
    id: string
    position: [number, number, number]
    matrix: Matrix4
    rotation: Quaternion
    baseColor: string
    colors: {
        right?: string
        left?: string
        top?: string
        bottom?: string
        front?: string
        back?: string
    }
}

export function createCubeModel(): Cubie[] {
    const cubies: Cubie[] = []

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                if (x === 0 && y === 0 && z === 0) continue

                const position = new Vector3(x, y, z)
                const rotation = new Quaternion()
                const matrix = new Matrix4().compose(
                    position,
                    rotation,
                    new Vector3(1, 1, 1)
                )

                cubies.push({
                    id: `${x}_${y}_${z}`,
                    position: [x, y, z],
                    matrix,
                    rotation,
                    // color de fondo
                    baseColor: "#000000",
                    colors: {
                        right: x === 1 ? "#FF7EB9" : undefined,   
                        left: x === -1 ? "#ffaa33" : undefined,   
                        top: y === 1 ? "#FFFFFF" : undefined,     
                        bottom: y === -1 ? "#FAFF70" : undefined, 
                        front: z === 1 ? "#00FFC6" : undefined,   
                        back: z === -1 ? "#BF95FF" : undefined,   
                    }
                })
            }
        }
    }
    return cubies
}



