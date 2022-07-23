import * as categoryRepository from '../repositories/categoryRepository.js';

export async function findCategories() {
    return await categoryRepository.findAll();
}