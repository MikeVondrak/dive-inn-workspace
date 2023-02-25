import { Response } from 'express';

export type GenericResponse = 'SUCCESS' | 'FAIL';

export type RouterCallback<ReturnType> = (route: string, res: Response, values?: ReturnType[]) => void;