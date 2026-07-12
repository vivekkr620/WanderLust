import categories from "../../data/categories.js"
import CategoryItem from "./CategoryItem";

function Categories(){
    return (
        <div className="flex justify-center gap-8 py-6">
            {
                categories.map((category) => (
                    <CategoryItem
                        key={category.id}
                        category={category}
                    />
                ))
            }
        </div>
    )
}

export default Categories;