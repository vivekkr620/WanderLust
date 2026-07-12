
function CategoryItem({ category }) {

    const Icon = category.icon;

    return (
        <div className="flex flex-col items-center cursor-pointer">
            
            <Icon className="text-2xl" />
            <p>{category.label}</p>

        </div>
    )
}

export default CategoryItem;