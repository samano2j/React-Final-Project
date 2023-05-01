import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

import config from '../../config';
import { supabase } from '../../lib/supabaseClient'

export const getData = createAsyncThunk(
    "inventory/getData",
    async (mode) => {
        
        if(mode.mode == 'normal') {
            const { data, error } = await supabase
            .from(config.tableName)
            .select('*')
            .order('Id', { ascending: true })

            if (error) {
                toast.error(error.message)
                return []
            }

            return data
        }
        else if (mode.mode == 'title') {
            const { data, error } = await supabase
            .from(config.tableName)
            .select('*')
            .order('Title', { ascending: mode.value })

            if (error) {
                toast.error(error.message)
                return []
            }

            return data
        }
        else if (mode.mode == 'id') {
            const { data, error } = await supabase
            .from(config.tableName)
            .select('*')
            .order('Id', { ascending: mode.value })

            if (error) {
                toast.error(error.message)
                return []
            }

            return data
        }
        else if (mode.mode == 'state') {
            const { data, error } = await supabase
            .from(config.tableName)
            .select('*')
            .order('State', { ascending: mode.value })

            if (error) {
                toast.error(error.message)
                return []
            }

            return data
        }
        else if (mode.mode == 'url') {
            const { data, error } = await supabase
            .from(config.tableName)
            .select('*')
            .order('Url', { ascending: mode.value })

            if (error) {
                toast.error(error.message)
                return []
            }

            return data
        }
        else if (mode.mode == 'createdAt') {
            const { data, error } = await supabase
            .from(config.tableName)
            .select('*')
            .order('Created_at', { ascending: mode.value })

            if (error) {
                toast.error(error.message)
                return []
            }

            return data
        }
        else if (mode.mode == 'updatedAt') {
            const { data, error } = await supabase
            .from(config.tableName)
            .select('*')
            .order('Updated_at', { ascending: mode.value })

            if (error) {
                toast.error(error.message)
                return []
            }

            return data
        }
        else if (mode.mode == 'filter') {

            const filterString = '%' + mode.value + '%'

            const { data, error } = await supabase
                .from(config.tableName)
                .select()
                .ilike('Title', filterString)

            if (error) {
                toast.error(error.message)
                return []
            }

            return data
        }
        
        
    }
)
