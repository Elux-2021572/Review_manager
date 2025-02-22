import Category from "../src/category/category.model.js";

export const createCategoryDefault = async () => {
    try {
        const category = await Category.findOne({ nameCategory: "General" });

        if (!category) {
            await Category.create({
                nameCategory: "General",
                descriptionCategory: "Default category",
            });
            console.log("Default category created successfully");
        } else {
            console.log("Default category already exists");
        }
    } catch (err) {
        console.error("Error creating default category:", err.message);
    }
};