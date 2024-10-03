import { redirectToUrl, logUserData } from './utils';

// Root URL handling
export default async function Index() {
    await logUserData("/");
    await redirectToUrl("/");
}
