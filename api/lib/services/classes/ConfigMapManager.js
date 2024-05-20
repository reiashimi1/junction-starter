
class ConfigMapManager {
    constructor({file, context, namespace}) {
        const kc = new k8s.KubeConfig();
        kc.loadFromString(file);
        kc.setCurrentContext(context);
        this.apiCoreV1 = kc.makeApiClient(k8s.CoreV1Api);
        this.namespace = namespace;
    }

    async createConfigMap(configMap) {
        const response = await this.apiCoreV1.createNamespacedConfigMap(this.namespace, configMap);
        return response.body;
    }

    async getConfigMap(name) {
        const response = await this.apiCoreV1.readNamespacedConfigMap(name, this.namespace);
        return response.body;
    }

    async listConfigMaps() {
        const response = await this.apiCoreV1.listNamespacedConfigMap(this.namespace);
        return response.body.items;
    }

    async deleteConfigMap(name) {
        const response = await this.apiCoreV1.deleteNamespacedConfigMap(name, this.namespace);
        return response.body;
    }

    async patchConfigMap(name, patch) {
        const options = { "headers": { "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH }};
        const response = await this.apiCoreV1.patchNamespacedConfigMap(name, this.namespace,
            patch,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            options
        );
        return response.body;
    }
}

module.exports = ConfigMapManager;
