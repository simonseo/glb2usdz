import { exec } from 'child_process';
import { NotImplementedError } from "./error";

const createTable = (x, y, z) => {
    // do something
    throw NotImplementedError('createTable is not implemented.');
    return scene;
};

const downloadModel = scene => {
    let gltfPath = '';
    // do something
    throw NotImplementedError('downloadModel is not implemented.');
    return gltfPath;
};

const gltf2usd = gltfPath => {
    let usdzPath = '';
    // exec('sh glb2usdz.sh');
    throw NotImplementedError('gltf2usd is not implemented.');
    return usdzPath;
};

modules.export = {
    createTable,
    downloadModel,
    gltf2usd,
};