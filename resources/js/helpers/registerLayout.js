export default function registerLayout(app) {
    const layouts = import.meta.glob('@/components/layouts/*.vue',{ eager: true }) //import: 'default',
    Object.entries(layouts).forEach(([, layout]) => {
        // const layoutName = layout?.default?.name || layout?.default?.__name;
        // app.component(layoutName, layout?.default);
        // app.component(layout.__name, layout);
        app.component(layout?.default?.__name, layout?.default);
    });
}
