import type { MoveType } from "../types/cube.types";


export const getInverseMove = (move: MoveType): MoveType=>{
    return move.includes("'") ? (move.replace("'", "") as MoveType) : (`${move}'` as MoveType)
}