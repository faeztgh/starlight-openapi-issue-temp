import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { generateAPI } from "starlight-openapi";

const { openAPISidebarGroups, starlightOpenAPI } = await generateAPI([
    {
        base: "api",
        label: "test",
        schema: "./schemas/animals.yaml",
    },
]);
// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', link: '/guides/example/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				...openAPISidebarGroups
			],
		}),
        starlightOpenAPI(),
	],
});
