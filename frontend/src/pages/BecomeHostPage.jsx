import AuthInput from "../components/Auth/AuthInput";
import AuthLayout from "../components/Auth/AuthLayout";
import AuthButton from "../components/Auth/AuthButton";

export default function BecomeHostPage() {

    return (
        <AuthLayout
            title="Become a Host"
            subtitle="Share your place with travelers around the world"
        > 
            <AuthInput 
                label="Property Title"
                placeholder="Enter property title"
            />

            <AuthInput 
                label="Location"
                placeholder="Enter location"
            />

            <AuthInput 
                label="Country"
                placeholder="Enter Country"
            />

            <AuthInput 
                label="Price Per Night"
                type="number"
                placeholder="Enter price"
            />

            <AuthInput 
                label="Image URL"
                placeholder="Paste image URL"
            />

            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                    rows="5"
                    placeholder="Describe your property..."
                    className="
                      w-full
                      px-4
                      py-3
                      border
                      border-gray-300
                      rounded-xl
                      outline-none
                      resize-none
                      focus:ring-2
                      focus:ring-rose-500
                      focus:border-rose-500
                    "
                ></textarea>
            </div>

            <div className="mt-6">
                <AuthButton
                    text="Publish Listing"
                    type="submit"
                />
            </div>

        </AuthLayout>
    )
}