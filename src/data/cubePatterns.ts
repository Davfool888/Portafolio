import type { MoveType } from "../types/cube.types";

export const checkerboardPattern: MoveType[] = [
    "U", "U", "D", "D",
    "R", "R", "L", "L",
    "F", "F", "B", "B"
]

export const checkerboardPatternInverse: MoveType[] = [
    "B", "B", "F", "F",
    "L", "L", "R", "R",
    "D", "D", "U", "U"
]



export const interChangeCubeMid: MoveType[] =[
    "U","D'", "L", "R'",
    "B", "F'", "U", "D'"

]

export const interChangeCubeMidInverse: MoveType[] = [
    "D", "U'", "F", "B'",
    "R", "L'", "D", "U'"
]

export const turntwofortwo: MoveType[] = [
    "F", "L", "F", "U'",
    "R", "U", "F", "F",
    "L", "L", "U'", "L'",
    "B", "D'", "B'", "L",
    "L", "U"
]
export const turntwofortwoInverse: MoveType[] = [
    "U'", "L'", "L'", "B", "D",
    "B'", "L", "U", "L", "L",
    "F'", "F'", "U'", "R'", "U",
    "F'", "L'", "F'"
]

export const Tpatron: MoveType[]= [
    "F", "F", "R", "R",
    "U", "U", "F'", "B",
    "D", "D", "L", "L", 
    "F", "B"
]
export const TpatronInverse: MoveType[] = [
    "B'", "F'", "L'", "L'",
    "D'", "D'", "B'", "F",
    "U'", "U'", "R'", "R'",
    "F'", "F'"
]

