// TODO : why do i need this?

import { INestApplication } from '@nestjs/common';
import mongoose from 'mongoose';

export declare function createE2EApp(): Promise<{ app: INestApplication; mongoose: typeof mongoose }>;
export declare function closeE2EApp(app: INestApplication): Promise<void>;