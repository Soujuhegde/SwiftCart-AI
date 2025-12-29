
const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <div>
                    &copy; {new Date().getFullYear()} SwiftCart AI. All rights reserved.
                </div>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gray-900">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-900">Terms of Service</a>
                    <a href="#" className="hover:text-gray-900">Microsoft Imagine Cup</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
