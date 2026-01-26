import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient } from "@supabase/supabase-js";
import { SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class StorageService {
  private storageClient: SupabaseClient;
  constructor(private configService: ConfigService) {
    this.storageClient = this.createStorageClient();
  }

  private createStorageClient(): SupabaseClient {
    const url = this.configService.getOrThrow<string>(`PROJECT_URL`);
    const key = this.configService.getOrThrow<string>(`DATA_SECRET`);

    // ESLint-safe boundary
    return createClient(url, key) as SupabaseClient;
  }

  get storage() {
    return this.storageClient.storage;
  }

  async getSignedUrl(bucketName: string, fileName: string) {
    const { data, error } = await this.storageClient.storage
      .from(bucketName)
      .createSignedUrl(fileName, 60 * 60 * 24);
    console.log(data?.signedUrl);
    if (error || !data) {
      throw new NotFoundException("Audio file not found");
    }

    return data.signedUrl;
  }
}
