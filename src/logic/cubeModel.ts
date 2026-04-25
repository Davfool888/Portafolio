import { Matrix4, Vector3 } from "three"

export type Cubie = {
    id: string
    position: [number, number, number]
    matrix: Matrix4
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

                const matrix = new Matrix4()

                matrix.makeTranslation(x, y, z)


                cubies.push({
                    id: `${x}_${y}_${z}`,
                    position: [x, y, z],
                    matrix,
                    colors: {
                        right: x === 1 ? "#FF6B6B" : undefined,
                        left: x === -1 ? "#FF8C42" : undefined,
                        top: y === 1 ? "#FFD93D" : undefined,
                        bottom: y === -1 ? "#FFFFFF" : undefined,
                        front: z === 1 ? "#6BCB77" : undefined,
                        back: z === -1 ? "#4D96FF" : undefined,
                    }
                })
            }
        }
    }

    return cubies
}