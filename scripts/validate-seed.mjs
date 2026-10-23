import fs from 'node:fs';
import assert from 'node:assert/strict';

const seed = JSON.parse(fs.readFileSync(new URL('../assets/knowledge-graph-seed-160.json', import.meta.url), 'utf8'));
const schema = JSON.parse(fs.readFileSync(new URL('../assets/knowledge-graph-seed.schema.json', import.meta.url), 'utf8'));
const report = JSON.parse(fs.readFileSync(new URL('../assets/validation-report.json', import.meta.url), 'utf8'));

assert.equal(seed.status, 'design_seed_not_published', 'seed must remain unpublished');
assert.equal(seed.domains.length, 16);
assert.equal(seed.topics.length, 64);
assert.equal(seed.nodes.length, 160);
assert.ok(Array.isArray(seed.edges));
assert.ok(Array.isArray(seed.resources));
assert.equal(schema.properties.domains.minItems, 16);
assert.equal(schema.properties.topics.minItems, 64);
assert.equal(schema.properties.nodes.minItems, 160);

const unique = (values, label) => assert.equal(new Set(values).size, values.length, label + ' IDs must be unique');
unique(seed.domains.map(x => x.id), 'domain');
unique(seed.topics.map(x => x.id), 'topic');
unique(seed.nodes.map(x => x.id), 'node');
unique(seed.resources.map(x => x.id), 'resource');

const domainIds = new Set(seed.domains.map(x => x.id));
const topicIds = new Set(seed.topics.map(x => x.id));
const nodeIds = new Set(seed.nodes.map(x => x.id));
for (const topic of seed.topics) assert.ok(domainIds.has(topic.domain_id), 'topic domain reference must exist: ' + topic.id);
for (const node of seed.nodes) {
  assert.ok(topicIds.has(node.topic_id), 'node topic reference must exist: ' + node.id);
  for (const prereq of node.prerequisite_ids ?? []) assert.ok(nodeIds.has(prereq), 'prerequisite must exist: ' + prereq);
}
for (const edge of seed.edges) {
  const from = edge.from_node_id ?? edge.from;
  const to = edge.to_node_id ?? edge.to;
  if (from !== undefined) assert.ok(nodeIds.has(from), 'edge source must exist: ' + from);
  if (to !== undefined) assert.ok(nodeIds.has(to), 'edge target must exist: ' + to);
}
assert.equal(report.domains, 16);
assert.equal(report.topics, 64);
assert.equal(report.nodes, 160);
assert.equal(report.resource_license_per_item_verified, 0, 'do not imply source licensing is verified');
assert.equal(report.github_g0, 'pending_local_workspace_evidence');
console.log('SEED_STRUCTURE_PASS: 16 domains, 64 topics, 160 nodes; unpublished status and license/G0 hold preserved.');
