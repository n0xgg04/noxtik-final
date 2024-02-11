import iaxios from "@/global/utils/axios";
import env from "@/config/env";

export default async function getVideoDetail(url: string) {
  try {
    const req = await iaxios.get<Root>(`${env.END_POINT}${url}`);
    return req.data;
  } catch (e) {
    throw new GetVideoFailedException((e as Error).message);
  }
}
