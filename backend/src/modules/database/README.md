# Database Module

Production-ready MongoDB integration for the Edu-Jarvis backend using NestJS and Mongoose.

## Features

- **Production-ready connection pooling** - Optimized pool size and connection management
- **Automatic reconnection** - Handles connection failures gracefully
- **Health monitoring** - Database status available via `/health` endpoint
- **Schema best practices** - Includes indexes, timestamps, and proper transformations
- **Environment-based configuration** - Separate configs for dev/prod
- **Type safety** - Full TypeScript support with Mongoose schemas

## Configuration

### Environment Variables

Set the following in your `.env` file:

```env
MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/?appName=ClusterOren
MONGODB_DB_NAME=edujarvis
```

### Connection Options

The database module is configured with production-ready settings:

- **Connection Pool**: 5-10 connections
- **Timeouts**: Socket (45s), Server selection (5s), Connection (10s)
- **Retry Logic**: Enabled for reads and writes
- **Auto-indexing**: Disabled in production
- **Compression**: zlib compression enabled

## Usage

### Creating a Schema

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

### Using in a Module

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../database/schemas';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

### Using in a Service

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../database/schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: any): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
```

## Best Practices

### Indexes

Always add indexes for fields that are frequently queried:

```typescript
@Prop({ index: true })
email: string;

// Compound index
UserSchema.index({ isActive: 1, createdAt: -1 });
```

### Timestamps

Enable automatic timestamp fields:

```typescript
@Schema({ timestamps: true })
export class User {
  // Fields...
}
```

### Password Security

Never expose passwords in responses:

```typescript
@Prop({ required: true, select: false })
password: string;
```

### JSON Transformation

Clean up MongoDB-specific fields:

```typescript
@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
```

### Pagination

For large datasets, always implement pagination:

```typescript
async findAll(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  return this.userModel
    .find()
    .skip(skip)
    .limit(limit)
    .exec();
}
```

## Health Check

The `/health` endpoint includes database status:

```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2026-02-13T12:00:00.000Z",
  "database": {
    "status": "connected",
    "name": "edujarvis",
    "host": "clusteroren.lxzksuv.mongodb.net"
  }
}
```

## Troubleshooting

### Connection Issues

If you encounter connection issues:

1. Check your IP is whitelisted in MongoDB Atlas
2. Verify credentials are correct
3. Check network connectivity
4. Review connection logs in console

### Performance

For slow queries:

1. Ensure proper indexes are created
2. Use `.explain()` to analyze queries
3. Consider using lean queries for read-only operations
4. Implement pagination for large datasets

## Production Deployment

1. **Disable auto-indexing**: Already configured to disable in production
2. **Create indexes manually**: Use MongoDB Atlas or migration scripts
3. **Monitor connections**: Use MongoDB Atlas monitoring tools
4. **Set up alerts**: Configure alerts for connection failures
5. **Use connection pooling**: Already configured with optimal pool size
6. **Enable compression**: Already enabled with zlib
