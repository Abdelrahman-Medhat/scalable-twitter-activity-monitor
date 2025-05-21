-- Add worker nodes
SELECT citus_add_node('postgres-shard-1', 5432);
SELECT citus_add_node('postgres-shard-2', 5432);

-- Minimal table definition for distribution
CREATE TABLE activity (
    id  UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

SELECT create_distributed_table('activity', 'id');