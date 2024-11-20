using AutoMapper;
using Binge.Domain.Models;
using Binge.Domain.ViewModel;

namespace Binge.Application.Commons.AutoMapper
{
	public class MapInitializer : Profile
	{
		public MapInitializer()
		{
			CreateMap<Feature, FeatureViewModel>();
		}
	}
}