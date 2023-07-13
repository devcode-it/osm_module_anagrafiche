import glob from 'fast-glob';
import * as fs from 'node:fs';
import yaml from 'yaml';
import libxmljs2 from 'libxmljs2';

/** @source https://stackoverflow.com/a/75569189/7520280 */
export let green = (input) => '\x1b[32m' + input + '\x1b[0m'
export let cyan = (input) => '\x1b[36m' + input + '\x1b[0m'

const projectFilePath = glob.globSync(`.idea/*.iml`)[0];
/** @type {libxmljs2.Document} */
const xml = libxmljs2.parseXmlString(fs.readFileSync(projectFilePath, 'utf8'));
const workspaces = yaml.parse(fs.readFileSync('pnpm-workspace.yaml', 'utf8')).packages;
console.log(`Found ${workspaces.length} workspaces`)
for (const workspace of workspaces) {
    const packageJson = JSON.parse(fs.readFileSync(`${workspace}/package.json`, 'utf8'));
    // Unignore dependencies folders in Jetbrains IDEs
    console.log(`Unignoring dependencies in ${workspace}`);
    for (const dependency of Object.keys(packageJson.dependencies)) {
        console.log(`Unignoring ${dependency}`);
        const newChild = new libxmljs2.Document();
        const contentNode = newChild.node('content').attr({
            url: `file://$MODULE_DIR$/node_modules/${dependency}`,
        });
        // Check if the dependency is already unignored
        if (xml.get(`//module/component/content[@url="${contentNode.attr('url').value()}"]`)) {
            console.log(cyan(`Dependency ${dependency} is already unignored. Skipping...`));
            continue;
        }

        /** @type {libxmljs2.Element} */
        const lastContentNode = xml.get(`//module/component/content[last()]`);
        console.log(green(`Adding ${dependency} after ${lastContentNode.toString()}`));
        lastContentNode.addNextSibling(contentNode);
    }
}
console.log(`Writing to ${projectFilePath}`);
fs.writeFileSync(projectFilePath, xml.toString(), 'utf8');
console.log(green('Done!'));
