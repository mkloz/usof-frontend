import { redirect, RouteObject } from "react-router-dom";
import ContentLayout from "~/components/layouts/content";
import CategoriesPage from "~/pages/categories";
import CategoryPage from "~/pages/categories/[id]";
import NotFoundPage from "~/pages/not-found";
import PostsPage from "~/pages/posts";
import PostPage from "~/pages/posts/[id]";
import FavoritesPage from "~/pages/posts/favorite";
import PopularPostsPage from "~/pages/posts/popular";
import RecentPostsPage from "~/pages/posts/recent";
import UsersPage from "~/pages/users";
import UserPage from "~/pages/users/[id]";
import UserMePage from "~/pages/users/me";

const routes: RouteObject[] = [
	{ path: "/", loader: () => redirect("/posts/popular") },
	{ path: "/posts", element: <PostsPage /> },
	{ path: "/posts/popular", element: <PopularPostsPage /> },
	{ path: "/posts/recent", element: <RecentPostsPage /> },
	{ path: "/posts/favorite", element: <FavoritesPage /> },
	{ path: "/posts/:id", element: <PostPage /> },
	{ path: "/users", element: <UsersPage /> },
	{ path: "/users/me", element: <UserMePage /> },
	{ path: "/users/:id", element: <UserPage /> },
	{ path: "/categories", element: <CategoriesPage /> },
	{ path: "/categories/:id", element: <CategoryPage /> },
	{ path: "*", element: <NotFoundPage /> },
];

const ContentRoute = {
	element: <ContentLayout />,
	children: routes,
};

export default ContentRoute;
