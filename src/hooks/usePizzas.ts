import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Pizza } from '@/types';

export const usePizzas = (category?: string) => {
  return useQuery({
    queryKey: ['pizzas', category],
    queryFn: async () => {
      let query = supabase.from('pizzas').select('*').eq('is_available', true);
      
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query.order('name');
      if (error) throw error;
      return data as Pizza[];
    },
  });
};
