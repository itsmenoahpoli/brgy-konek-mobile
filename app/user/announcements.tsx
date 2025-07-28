import { DashboardLayout } from '../../components/layouts/DashboardLayout';
import { View, Text, Pressable, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import announcementService from '../../services/announcement.service';

type Announcement = {
  _id: string;
  title: string;
  title_slug: string;
  header: string;
  body: string;
  banner_image: string;
  status: string;
  created_at: string;
  posted_by: string;
};

export default function AnnouncementsPage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching announcements...');
      const data = await announcementService.getAnnouncements();
      console.log('Announcements data:', data);
      setAnnouncements(data);
    } catch (err) {
      console.error('Error fetching announcements:', err);
      setError('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <DashboardLayout title="Announcements">
      <View className="flex-1 bg-gray-50">
        <View className="flex-1 px-4 pt-6">
          <View className="mb-2 flex-row items-center">
            <Pressable onPress={() => router.push('/user')}>
              <Text className="text-blue-600">User</Text>
            </Pressable>
            <Text className="mx-2 text-gray-400">/</Text>
            <Text className="font-medium text-gray-800">Announcements</Text>
          </View>

          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-800">Announcements</Text>
          </View>

          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="mt-2 text-gray-600">Loading announcements...</Text>
            </View>
          ) : error ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-center text-red-600">{error}</Text>
              <Pressable
                onPress={fetchAnnouncements}
                className="mt-2 rounded-lg bg-blue-600 px-4 py-2">
                <Text className="font-medium text-white">Retry</Text>
              </Pressable>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="flex-1"
              contentContainerStyle={{ paddingBottom: 20 }}>
              {announcements.length === 0 ? (
                <View className="flex-1 items-center justify-center py-8">
                  <Text className="text-center text-gray-500">No announcements available</Text>
                </View>
              ) : (
                <View className="space-y-4">
                  {announcements.map((announcement) => (
                    <View
                      key={announcement._id}
                      className="my-2 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                      {announcement.banner_image && (
                        <Image
                          source={{ uri: announcement.banner_image }}
                          className="h-40 w-full"
                          resizeMode="cover"
                        />
                      )}
                      <View className="p-4">
                        <View className="mb-2 flex-row items-start justify-between">
                          <Text className="mr-2 flex-1 text-lg font-semibold text-gray-800">
                            {announcement.title}
                          </Text>
                          <View className="rounded-full bg-blue-100 px-2 py-1">
                            <Text className="text-xs font-medium text-blue-700">
                              {announcement.status}
                            </Text>
                          </View>
                        </View>

                        <Text className="mb-2 text-sm font-medium text-gray-700">
                          {announcement.header}
                        </Text>

                        {announcement.body && (
                          <Text className="mb-3 text-sm leading-5 text-gray-600">
                            {announcement.body}
                          </Text>
                        )}

                        <View className="flex-row items-center justify-between">
                          <Text className="text-xs text-gray-500">By {announcement.posted_by}</Text>
                          <Text className="text-xs text-gray-500">
                            {formatDate(announcement.created_at)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </DashboardLayout>
  );
}
