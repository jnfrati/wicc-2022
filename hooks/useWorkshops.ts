import { useEffect, useState } from "react";
import { IWorkshop } from "../models/workshop.model";

const useWorkshops = (
  initialWorkshops?: IWorkshop[]
): {
  workshops: IWorkshop[];
  loading: boolean;
  getWorkshops: () => Promise<{ success: boolean; workshops?: IWorkshop[] }>;
  createWorkshop: (workshopData: IWorkshop) => void;
  updateWorkshopTitle: (updateData: IWorkshop) => void;
  deleteWorkshop: (_id: string) => Promise<{ success: boolean }>;
} => {
  const [workshops, setWorkshops] = useState<IWorkshop[]>(
    initialWorkshops || []
  );
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!initialWorkshops && workshops?.length) {
      fetch("/api/workshop?all=true").then(async (res) => {
        if (res.ok) {
          const response = await res.json();
          setWorkshops(response.workshops);
        }
      });
    }
  }, [workshops?.length, initialWorkshops, setWorkshops]);

  const createWorkshop = async (workshopData: IWorkshop) => {
    setLoading(true);
    const {
      newWorkshop,
    }: { success: boolean; newWorkshop: IWorkshop } = await fetch(
      "/api/workshop",
      {
        method: "POST",
        body: JSON.stringify(workshopData),
      }
    ).then((res) => res.json());

    setWorkshops((values) => [...values, newWorkshop]);
    setLoading(false);
  };

  const updateWorkshopTitle = async ({ _id, ...updateData }: IWorkshop) => {
    setLoading(true);
    const updatedWorkshop: IWorkshop = await fetch(`/api/workshop/${_id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    }).then((res) => res.json());
    const updatedWorkshopIndex = workshops.findIndex(
      (cat) => cat._id === updatedWorkshop._id
    );
    setWorkshops((values) => {
      values.splice(updatedWorkshopIndex, 1, updatedWorkshop);
      return [...values];
    });
    setLoading(false);
  };

  const deleteWorkshop = async (_id: string) => {
    setLoading(true);
    const success = await fetch(`/api/workshop/${_id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    const updatedWorkshopIndex = workshops.findIndex((cat) => cat._id === _id);
    setWorkshops((values) => {
      values.splice(updatedWorkshopIndex, 1);
      return [...values];
    });
    setLoading(false);
    return success as { success: boolean };
  };

  const getWorkshops = (): Promise<{
    success: boolean;
    workshops?: IWorkshop[];
  }> =>
    fetch("/api/workshop?all=true").then(async (res) => {
      if (res.ok) {
        const response = await res.json();
        if (response.workshops) {
          setWorkshops(response.workshops);
        }

        return { success: response.success, workshops: response.workshops };
      }
      return { success: false };
    });

  return {
    workshops,
    loading,
    getWorkshops,
    createWorkshop,
    updateWorkshopTitle,
    deleteWorkshop,
  };
};

export default useWorkshops;
