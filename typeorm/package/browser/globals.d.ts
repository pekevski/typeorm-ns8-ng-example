import { MetadataArgsStorage } from "./metadata-args/MetadataArgsStorage";
import { ConnectionOptions } from "./connection/ConnectionOptions";
import { ConnectionManager } from "./connection/ConnectionManager";
import { Connection } from "./connection/Connection";
import { EntityManager } from "./entity-manager/EntityManager";
import { MongoEntityManager } from "./entity-manager/MongoEntityManager";
import { SqljsEntityManager } from "./entity-manager/SqljsEntityManager";
import { EntityTarget } from "./common/EntityTarget";
import { Repository } from "./repository/Repository";
import { TreeRepository } from "./repository/TreeRepository";
import { ObjectType } from "./common/ObjectType";
import { MongoRepository } from "./repository/MongoRepository";
import { SelectQueryBuilder } from "./query-builder/SelectQueryBuilder";
/**
 * Gets metadata args storage.
 */
export declare function getMetadataArgsStorage(): MetadataArgsStorage;
/**
 * Reads connection options stored in ormconfig configuration file.
 */
export declare function getConnectionOptions(connectionName?: string): Promise<ConnectionOptions>;
/**
 * Gets a ConnectionManager which creates connections.
 */
export declare function getConnectionManager(): ConnectionManager;
/**
 * Creates a new connection and registers it in the manager.
 * Only one connection from ormconfig will be created (name "default" or connection without name).
 */
export declare function createConnection(): Promise<Connection>;
/**
 * Creates a new connection from the ormconfig file with a given name.
 */
export declare function createConnection(name: string): Promise<Connection>;
/**
 * Creates a new connection and registers it in the manager.
 */
export declare function createConnection(options: ConnectionOptions): Promise<Connection>;
/**
 * Creates new connections and registers them in the manager.
 *
 * If connection options were not specified, then it will try to create connection automatically,
 * based on content of ormconfig (json/js/yml/xml/env) file or environment variables.
 * All connections from the ormconfig will be created.
 */
export declare function createConnections(options?: ConnectionOptions[]): Promise<Connection[]>;
/**
 * Gets connection from the connection manager.
 * If connection name wasn't specified, then "default" connection will be retrieved.
 */
export declare function getConnection(connectionName?: string): Connection;
/**
 * Gets entity manager from the connection.
 * If connection name wasn't specified, then "default" connection will be retrieved.
 */
export declare function getManager(connectionName?: string): EntityManager;
/**
 * Gets MongoDB entity manager from the connection.
 * If connection name wasn't specified, then "default" connection will be retrieved.
 */
export declare function getMongoManager(connectionName?: string): MongoEntityManager;
/**
 * Gets Sqljs entity manager from connection name.
 * "default" connection is used, when no name is specified.
 * Only works when Sqljs driver is used.
 */
export declare function getSqljsManager(connectionName?: string): SqljsEntityManager;
/**
 * Gets repository for the given entity class.
 */
export declare function getRepository<Entity>(entityClass: EntityTarget<Entity>, connectionName?: string): Repository<Entity>;
/**
 * Gets tree repository for the given entity class.
 */
export declare function getTreeRepository<Entity>(entityClass: EntityTarget<Entity>, connectionName?: string): TreeRepository<Entity>;
/**
 * Gets tree repository for the given entity class.
 */
export declare function getCustomRepository<T>(customRepository: ObjectType<T>, connectionName?: string): T;
/**
 * Gets mongodb repository for the given entity class or name.
 */
export declare function getMongoRepository<Entity>(entityClass: EntityTarget<Entity>, connectionName?: string): MongoRepository<Entity>;
/**
 * Creates a new query builder.
 */
export declare function createQueryBuilder<Entity>(entityClass?: EntityTarget<Entity>, alias?: string, connectionName?: string): SelectQueryBuilder<Entity>;
