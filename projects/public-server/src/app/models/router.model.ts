import { Response } from 'express';

export type RouterCallback<ReturnType> = (route: string, query: string, res: Response, values?: any[]) => ReturnType;