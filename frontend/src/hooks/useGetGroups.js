import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetGroups = () => {
  const [loading, setLoading] = useState(false);

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/group`);
        const data = await res.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        setGroups(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  return { loading, groups };
};

export default useGetGroups;
